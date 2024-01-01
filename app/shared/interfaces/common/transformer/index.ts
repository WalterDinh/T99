export interface ITransformer<PresentationModel, RequestModel> {
  transformDataToPresentation(...params: any): PresentationModel;

  transformListDataToListPresentation(...params: any): PresentationModel[];

  transformPresentationToRequestModel(...params: any): RequestModel;

  transformListPresentationToListRequestModel(...params: any): RequestModel[];
}
