# nest-swagger-checker-linter
nest-swagger-checker-linter is linter version of [nest-swagger-checker](https://github.com/ozkersemih/nest-swagger-checker) package
to use it as ESLint rule.

This package uses nsc(nest-swagger-checker) package inside its own.

# configuration
Like nsc package, this linter package can be configured by using `.swautomaterc` file at the root path of project.

# setup
Like other eslint plugins, this plugin needs to be added to eslintrc configuration.

```
// .eslintrc.json file in project
...
"plugins": [
  "nest-swagger-checker-lint"
],
...
"rules": {
  "nest-swagger-checker-lint/api-property-rule": "error",
  "nest-swagger-checker-lint/api-information-rule": "error",
  "nest-swagger-checker-lint/api-param-rule": "error",
....
}
```

# examples
Lets assume you have endpoint method in a controller like below:
```typescript
  @Post('')
  @HttpCode(HttpStatus.OK)
  ..
  @AnotherDecorator()
  public async create(
    ...
  )
```
You will get eslint error because there is no ApiOperation decorator ta describe summary and description for endpoint.

Error should be like below:
![Screenshot 2024-05-19 at 17 28 19](https://github.com/ozkersemih/nest-swagger-checker-lint/assets/52029025/da894c4f-d03d-4917-8032-f9e5108c6f03)
