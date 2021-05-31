/**
 * @description Screenshot-Service parameters
 */
export interface ScreenshotOptions {
  url: string;
}
export interface ScreenshotResponse {
  success: boolean;
  message: string;
  data: ScreenshotOptions;
}
