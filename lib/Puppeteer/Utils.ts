class Utils {
  constructor() {}

  protected sleep = async (ms: number) =>
    new Promise((res) => setTimeout(res, ms));
}

export default Utils;
