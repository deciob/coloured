module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    meta: ""

    coffee:
      options:
        bare: true
      test:
        files:
          'test/buster.js': 'test/coffee/buster.coffee'
          'test/utils/audio_controller-test.js': 
            'test/coffee/utils/audio_controller-test.coffee'
      app:
        expand: true
        cwd: 'coffee'
        src: '**/*.coffee'
        dest: 'app'
        ext: '.js'

    compass:
      dist:
        #files:  # Dictionary of files
        #  # 'destination': 'source'
        #  'theme/css/basic.css': 'theme/sass/basic.scss'  
        options:
          sassDir: 'theme/sass',
          cssDir: 'theme/css',
          config: '.config.rb'
    

    #sass:
    #  #compile:
    #  #  files:
    #  #    'main.css': 'main.scss'
    #  dist:                         # Target
    #    files:                      # Dictionary of files
    #      'theme/css/foundation.css': 'theme/scss/foundation.scss'   # 'destination': 'source'
    #  #dist:
    #  #  options:
    #  #    #config: '.config.rb'
    #  #    sassDir: 'theme/scss'
    #  #    cssDir: 'theme/css'

    watch:
      files: ['coffee/**/*.coffee', 'theme/sass/*.scss', 
        'test/coffee/**/*.coffee'],
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
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['coffee', 'compass'])
  #grunt.registerTask('default', ['coffee'])
