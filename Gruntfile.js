module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {

            //Generic
            mkdirTemp: {
                command: 'mkdir temp-update'
            },

            //Pux routing
            gitclonePux: {
                command: 'git clone git://github.com/c9s/Pux.git temp-update'
            },

            move: {
                command: 'mv temp-update/src/Pux/Executor.php Walrus/core/route/Executor.php~'
                    + '&& mv temp-update/src/Pux/PatternCompiler.php Walrus/core/route/PatternCompiler.php~'
                    + '&& mv temp-update/src/Pux/Mux.php Walrus/core/route/Mux.php~'
                    + '&& mv temp-update/src/Pux/MuxCompiler.php Walrus/core/route/MuxCompiler.php~'
                    + '&& mv temp-update/src/Pux/Controller.php Walrus/core/route/Controller.php~'
                    + '&& mv temp-update/src/Pux/Dispatcher/APCDispatcher.php Walrus/core/route/APCDispatcher.php'
            }
        }


    });

    grunt.registerTask('updatePux', 'Clone Pux repository, move files and merge files', function() {
        grunt.task.run([
            'shell:mkdirTemp',
            'shell:gitclonePux'
        ]);
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

};