type id = number;
type name = string;
type date = string;
type points = number;
type idCategory = number;
type content = string;
type weeklyPoints = number;
type dollarPerPoint = number;
interface ICreateMissionProps {
    idParent: number,
    idChild: number,
    name: string,
    startDate: string,
    endDate?: string,
    points: number,
    idCategory: number,
    idChildNote?: number,
    idParentNote?: number
}
interface IGetAllMissionsByUserIdProps {
    idUser: id
}
interface IEditMissionProps {
    idMission: id,
    data: {
        name?: name,
        startDate?: date,
        endDate?: date,
        points?: points,
        idCategory?: idCategory
    }
}
interface IDeleteMissionProps {
    idMission: id
}
interface ICreateContractProps {
    idChild: id,
    content: content,
    idStatus: id,
    weeklyPoints: weeklyPoints,
    dollarPerPoint: dollarPerPoint
}
interface IGetContractByIdProps {
    idContract: id
}
interface ICloneContractProps {
    idContract: id
}
const exampleResponse = {
 getUser: {
    "id": 0,
    "email": "user@example.com",
    "roles": [
      "string"
    ],
    "firstname": "Théo ",
    "lastname": "Léao",
    "parent": "string"
  }

}
// export const createMission = (props: ICreateMissionProps) => {
//     return exampleResponse.createMission;
// }
export const getAllMissionsByUserId = (props: IGetAllMissionsByUserIdProps) => {
    return exampleResponse.getAllMissionsByUserId;
}
// export const editMission = (props: IEditMissionProps) => {
//     return exampleResponse.editMission;
// }
// export const deleteMission = (props: IDeleteMissionProps) => {
//     return exampleResponse.deleteMission;
// }
// export const createContract = (props: ICreateContractProps) => {
//     return exampleResponse.createContract;
// }
// export const getContractById = (props: IGetContractByIdProps) => {
//     return exampleResponse.getContractById;
// }
// export const cloneContract = (props: ICloneContractProps) => {
//     return exampleResponse.cloneContract;
// }
export const getUser = (props: any) => {
    return exampleResponse.getUser
}