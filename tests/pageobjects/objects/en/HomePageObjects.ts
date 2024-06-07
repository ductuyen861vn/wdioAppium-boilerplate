class HomePageObjects {
    /**
     * define elements
     */
    get txtSearch () { return $('//textarea[@name=\'q\']'); }
}

export default new HomePageObjects();