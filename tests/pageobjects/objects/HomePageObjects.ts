class HomePageObjects {
    /**
     * define elements
     */
    get txtSearch () { return $('[name="q"]'); }
}

export default new HomePageObjects();