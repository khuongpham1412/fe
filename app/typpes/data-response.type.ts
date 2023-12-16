// export interface DataResponse<T> {
//   message: string;
//   statusCode: number;
//   data: {
//     bookmarks?: T[];
//     bookmark?: T;
//     highLights?: T[];
//     highLight?: T;
//   };
// }
export interface DataResponse<T> {
  message: string;
  statusCode: number;
  data: T
}
