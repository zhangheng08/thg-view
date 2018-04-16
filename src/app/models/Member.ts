export interface Member {

  _id: String,
  active: Boolean,
  address: String,
  avatar:String,
  brief:String,
  chineseName:String,
  cv:String,
  email:String,
  enrolledYear:String,
  firstName:String,
  introduction:String,
  lastName:String,
  mobile:String,
  name:String,
  position:String,
  publications:[
    {
      json:Object
    }]

}
