import {WebElementUtils} from "@helpers/WebElementUtils.js";

interface XY {
    x: number;
    y: number;
}

export const DIRECTIONS = {
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
} as const;

type SwipeDirectionType = typeof DIRECTIONS[keyof typeof DIRECTIONS];

export class Gestures {
    /**
     * Check if an element is visible, if not, swipe a portion of the screen to
     * check if it is visible after x amount of scrolls.
     */
    static async checkIfDisplayedWithSwipe (
        {
            scrollContainer,
            searchableElement,
            maxScrolls,
            amount = 0,
            direction = DIRECTIONS.DOWN,
            percentage = 0.99,
        }: {
            scrollContainer: WebdriverIO.Element,
            searchableElement: WebdriverIO.Element,
            maxScrolls: number,
            amount?: number,
            direction?: SwipeDirectionType,
            percentage?: number,
        }
    ): Promise<void> {
        if (await WebElementUtils.isElementInViewport(searchableElement)) {
            return;
        }

        if (amount > maxScrolls) {
            throw new Error(`The element '${await searchableElement.selector}' could not be found or is not visible.`);
        }

        const scrollPercentage = this.getValidScrollPercentage(percentage);
        const { x, y } = await scrollContainer.getLocation();
        const { width, height } = await scrollContainer.getSize();
        const scrollRectangles = this.calculateScrollRectangles(x, y, width, height, scrollPercentage);

        await this.swipeInDirection(direction, scrollRectangles);

        await this.checkIfDisplayedWithSwipe({
            scrollContainer,
            searchableElement,
            maxScrolls,
            amount: amount + 1,
            direction,
            percentage,
        });
    }

    /**
     * Swipe from a starting element in the given direction by a specified length in pixels until the expected element is displayed
     */
    static async checkIfDisplayedWithSwipeByLength(
        {
            startElement,
            searchableElement,
            boundaryElement,
            maxSwipes,
            swipeLength,
            direction = DIRECTIONS.DOWN,
            swipeTimes = 1
        }: {
            startElement: WebdriverIO.Element,
            searchableElement: WebdriverIO.Element,
            boundaryElement: WebdriverIO.Element | null,
            maxSwipes: number,
            swipeLength: number,
            direction?: SwipeDirectionType,
            swipeTimes?: number,
        }
    ): Promise<void> {
        for (let i = 0; i < maxSwipes; i++) {
            if (await WebElementUtils.isElementInViewport(searchableElement)) {
                return;
            }

            const { x, y } = await startElement.getLocation();
            const { width, height } = await startElement.getSize();
            const startX = x + width / 2;
            const startY = y + height / 2;
            const swipeCoordinates = this.calculateSwipeCoordinates(startX, startY, swipeLength, direction);

            for (let j = 0; j < swipeTimes; j++) {
                await this.executeGesture({ from: swipeCoordinates.start, to: swipeCoordinates.end });
            }

            // Check if boundary element is visible
            if (boundaryElement) {
                const isBoundaryVisible = await WebElementUtils.isElementInViewport(boundaryElement);
                if (isBoundaryVisible) {
                    console.log('Boundary element found. Stopping swipes.');
                    return;
                }
            }
        }

        throw new Error(`The element '${await searchableElement.selector}' could not be found or is not visible.`);
    }

    private static calculateSwipeCoordinates(
        x: number,
        y: number,
        length: number,
        direction: SwipeDirectionType
    ): { start: XY, end: XY } {
        let start, end;

        switch (direction) {
            case DIRECTIONS.DOWN:
                start = { x, y };
                end = { x, y: y + length };
                break;
            case DIRECTIONS.LEFT:
                start = { x, y };
                end = { x: x - length, y };
                break;
            case DIRECTIONS.RIGHT:
                start = { x, y };
                end = { x: x + length, y };
                break;
            case DIRECTIONS.UP:
                start = { x, y };
                end = { x, y: y - length };
                break;
            default:
                throw new Error('Invalid swipe direction. Use one of: down, left, right, up.');
        }

        return { start, end };
    }

    private static getValidScrollPercentage(percentage: number): number {
        if (isNaN(percentage) || percentage > 1 || percentage < 0) {
            console.warn('The percentage to scroll should be a number between 0 and 1. Defaulting to 0.99.');
            return 0.99;
        }
        return 1 - percentage;
    }

    private static calculateScrollRectangles(
        x: number,
        y: number,
        width: number,
        height: number,
        scrollPercentage: number
    ): Record<string, XY> {
        return {
            top: { x: Math.round(x + width / 2), y: Math.round(y + height * scrollPercentage) },
            right: { x: Math.round(x + width - width * scrollPercentage), y: Math.round(y + height / 2) },
            bottom: { x: Math.round(x + width / 2), y: Math.round(y + height - height * scrollPercentage) },
            left: { x: Math.round(x + width * scrollPercentage), y: Math.round(y + height / 2) },
        };
    }

    private static async swipeInDirection(direction: SwipeDirectionType, scrollRectangles: Record<string, XY>) {
        let from, to;

        switch (direction) {
            case DIRECTIONS.DOWN:
                from = scrollRectangles.top;
                to = scrollRectangles.bottom;
                break;
            case DIRECTIONS.LEFT:
                from = scrollRectangles.right;
                to = scrollRectangles.left;
                break;
            case DIRECTIONS.RIGHT:
                from = scrollRectangles.left;
                to = scrollRectangles.right;
                break;
            case DIRECTIONS.UP:
                from = scrollRectangles.bottom;
                to = scrollRectangles.top;
                break;
            default:
                throw new Error('Invalid swipe direction. Use one of: down, left, right, up.');
        }

        await this.executeGesture({ from, to });
    }

    /**
     * Execute a gesture on the screen from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
     */
    static async executeGesture({ from, to }: { from: XY; to: XY }): Promise<void> {
        await driver
            .action('pointer')
            .move(from.x, from.y)
            .down()
            .pause(100)
            .move({ duration: 1000, x: to.x, y: to.y })
            .up()
            .perform();

        //Pause 1s to ensure swipe action was stopped
        await driver.pause(1000);
    }

    /**
     * This one is to ensure we reached top or down of page, so stop the swipe
     * @param direction
     */
    static async getScrollPosition(direction: SwipeDirectionType): Promise<number> {
        return await driver.execute((dir) => {
            if (dir === 'down' || dir === 'up') {
                return window.scrollY;
            } else if (dir === 'left' || dir === 'right') {
                return window.scrollX;
            }
            return 0;
        }, direction);
    }
}
