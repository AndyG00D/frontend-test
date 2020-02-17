export class ImagesHttpAdapter {
  public static transformToGifItem(data: IGifApi): IGif {
    return {
      title: data.title,
      url: data.images.fixed_height.url
    };
  }
}
