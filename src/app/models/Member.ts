export interface Member {

  _id: string;
  active: boolean;
  address: string;
  avatar: string;
  brief: string;
  chineseName: string;
  cv: string;
  email: string;
  enrolledYear: string;
  firstName: string;
  introduction: string;
  lastName: string;
  mobile: string;
  name: string;
  position: string;
  publications: [
    {
      json: object
    }];

}
