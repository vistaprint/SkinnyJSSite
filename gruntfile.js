/* globals module */

function renameFn(extOld, extNew) {
    return function (dest, path) {
        return dest + "/" + path.replace(extOld, extNew);
    };
}

module.exports = function (grunt) {
    var config = {
        pkg: grunt.file.readJSON("package.json"),
        docco: {
            javascript: {
                src: ["js/**/*.js"],
                dest: "./site/_site/docco/"
            }
        },
        mkdir: {
            docco: {
                options: {
                    create: ["./site/_site/docco/"]
                }
            }
        },
        copy: {
            distJs: {
                files: [{
                    expand: true,
                    cwd: "./js/",
                    src: ["**/*.js", "!*modalDialog*"],
                    dest: "dist/"
                }]
            },
            distCss: {
                files: [{
                    expand: true,
                    src: ["./css/jquery.modalDialog.skins.less"],
                    dest: "dist/"
                }]
            },
            distOther: {
                files: [{
                    expand: true,
                    src: ["./images/**"],
                    dest: "dist/"
                }, {
                    expand: true,
                    cwd: "./js/",
                    src: ["./postmessage.htm"],
                    dest: "dist/"
                }, {
                    expand: true,
                    cwd: "./dependencies/",
                    src: ["./*.js"],
                    dest: "dist/dependencies/"
                }]
            },
            distSite: {
                files: [{
                    expand: true,
                    cwd: "./dist",
                    src: ["**"],
                    dest: "./site/_site/dist/"
                }, {
                    expand: true,
                    flatten: true,
                    src: ["LICENSE"],
                    processFile: true,
                    dest: "./site/_site/"
                }]
            },
            doccoFix: {
                files: [{
                    expand: true,
                    cwd: "./site/_docco/",
                    src: ["**"],
                    dest: "./site/_site/docco"
                }]
            },
            deploy: {
                files: [{
                    expand: true,
                    cwd: "./site/_site/",
                    flatten: false,
                    src: ["**"],
                    dest: "./.git/docs-temp/"
                }]
            }
        },
        clean: {
            options: {
                force: true
            },
            build: ["./dist"],
            deploy: ["./.git/docs-temp"],
            docs: ["./site/_site"]
        },
        jekyll: {
            docs: {
                options: {
                    src: "./site/",
                    config: "./site/_config.yml",
                    dest: "./site/_site"
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: "./site/skinnyjs.zip"
                },
                files: [{
                    // includes files in path
                    expand: true,
                    src: ["**"],
                    cwd: "./dist",
                    dest: "",
                    filter: "isFile"
                }]
            }
        },
        "string-replace": {
            site: {
                files: [{
                    expand: true,
                    cwd: "./site/_site/",
                    flatten: false,
                    src: ["*.html"],
                    dest: "./site/_site/"
                }],
                options: {
                    replacements: [{
                        pattern: /\.\.\/dist\//ig,
                        replacement: "dist/"
                    }]
                }
            }
        }
    };

    // Project configuration.
    grunt.initConfig(config);

    // NPM tasks
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-docco");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-jekyll");
    grunt.loadNpmTasks("grunt-mkdir");

    grunt.registerTask("connect-keepalive", function () {
        var config = grunt.config.get("connect");
        config.server.options.keepalive = true;
        grunt.config.set("connect", config);
        grunt.task.run("connect");
    });

    // Custom tasks
    grunt.loadTasks("./site/_tasks");

    grunt.registerTask("travis", "default");

    grunt.registerTask("default", ["verify", "build"]);

    grunt.registerTask("copyDist", ["copy:distJs", "copy:distCss", "copy:distOther"]);

    grunt.registerTask("docs", ["mkdir:docco", "docco", "docco-add-links", "copy:doccoFix"]);

    grunt.registerTask("site", ["default", "compress", "sitePages", "docs", "copy:deploy"]);

    grunt.registerTask("sitePages", ["jekyll", "string-replace:site", "copy:distSite"]);
};
