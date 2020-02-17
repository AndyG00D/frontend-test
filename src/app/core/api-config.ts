import { environment } from '../../environments/environment';

export class ApiConfig {
  public static commonHttpParams: { [key: string]: string } = {
    api_key: environment.apiKey
  };
  public static basePath: string = environment.basePath;
  public static gifsPath: string = `${ApiConfig.basePath}/v1/gifs`;
  public static gifsSearchPath: string = `${ApiConfig.gifsPath}/search`;
}
