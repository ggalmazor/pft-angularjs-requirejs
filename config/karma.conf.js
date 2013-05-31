// Ver: http://karma-runner.github.io/0.8/config/configuration-file.html

basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  'test/main.js',
  {pattern: 'test/lib/**/*.js', included: false},
  {pattern: 'app/js/**/*.js', included: false},
  {pattern: 'app/lib/**/*.js', included: false},
  {pattern: 'test/unit/**/*.js', included: false}
];

exclude= [];

reporters = ['progress', 'growl', 'coverage'];

autoWatch = true;

singleRun = false;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};

preprocessors = {
  'app/js/**/*.js': 'coverage'
};
