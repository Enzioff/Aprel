const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Includes
const head = fs.readFileSync("src/includes/head.html");
const sectionHeader = fs.readFileSync("src/includes/section-header.html");
const sectionFooter = fs.readFileSync("src/includes/section-footer.html");
const temp = fs.readFileSync("src/includes/temp.html");

// Pages
module.exports = [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
        title: "Aprel",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/services.html",
        filename: "services.html",
        inject: "body",
        title: "Aprel | Услуги",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/services-detail.html",
        filename: "services-detail.html",
        inject: "body",
        title: "Aprel | Услуги детальная",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/about.html",
        filename: "about.html",
        inject: "body",
        title: "Aprel | О мастерской",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/product-page.html",
        filename: "product-page.html",
        inject: "body",
        title: "Aprel | Карточка товара",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/contacts.html",
        filename: "contacts.html",
        inject: "body",
        title: "Aprel | Контакты",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
    new HtmlWebpackPlugin({
        template: "./src/pages/catalog.html",
        filename: "catalog.html",
        inject: "body",
        title: "Aprel | Каталог",
        head,
        sectionHeader,
        sectionFooter,
        temp
    }),
];