declare module 'babel-plugin-glsl/macro' {
    const glsl: (strings: TemplateStringsArray, ...values: any[]) => string;
    export default glsl;
  }