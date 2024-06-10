class LanguageSettings {
    private static instance: LanguageSettings;
    private language: 'en' | 'fr' | 'es' | 'de' | 'cn' ;

    private constructor() {
        this.language = 'en'; // default language
    }

    public static getInstance(): LanguageSettings {
        if (!LanguageSettings.instance) {
            LanguageSettings.instance = new LanguageSettings();
        }
        return LanguageSettings.instance;
    }

    public setLanguage(language: 'en' | 'fr' | 'es' | 'de' | 'cn'): void {
        this.language = language;
    }

    public getLanguage(): 'en' | 'fr' | 'es' | 'de' | 'cn' {
        return this.language;
    }
}

// Exporting singleton instance
export const languageSettings = LanguageSettings.getInstance();