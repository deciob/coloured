module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    meta:
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */'

    coffee:
      options:
        bare: true
      src:
        expand: true
        cwd: 'coffee'
        src: '**/*.coffee'
        dest: 'app'
        ext: '.js'

    sass:
      #compile:
      #  files:
      #    'main.css': 'main.scss'
      dist:                         # Target
        files:                      # Dictionary of files
          'theme/css/foundation.css': 'theme/scss/foundation.scss'   # 'destination': 'source'
      #dist:
      #  options:
      #    #config: '.config.rb'
      #    sassDir: 'theme/scss'
      #    cssDir: 'theme/css'

    watch:
      files: ['coffee/**/*.coffee', 'theme/scss/*.scss'],
      tasks: 'default'

    coffeelint:
      files: ['coffee/**/*.coffee'],
      options:
        'no_trailing_whitespace': {'level': 'error'},
        'no_empty_param_list': {'level': 'warning'},
        'cyclomatic_complexity' : {'level' : 'warn', 'value' : 11},
        'max_line_length': {'level': 'warn'}
  )

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-coffeelint')
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['coffee', 'sass'])
