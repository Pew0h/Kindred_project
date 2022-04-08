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
    getAllMissionsByUserId: [{
        idMission: 1,
        idParent: 1,
        idChild: 2,
        name: 'Ranger le lave vaisselle',
        startDate: '30-12-22',
        endDate: '30-12-22',
        points: '12',
        idCategory: 1,
        idChildNote: null,
        idParentNote: null
    },
    {
        idMission: 2,
        idParent: 1,
        idChild: 2,
        name: 'Nettoyer le frigo',
        startDate: '30-12-22',
        endDate: '30-12-22',
        points: '12',
        idCategory: 1,
        idChildNote: null,
        idParentNote: null
    }],
    createMission: {
        idMission: 1,
        idParent: 1,
        idChild: 2,
        name: 'Ranger le lave vaisselle',
        startDate: '30-12-22',
        endDate: '30-12-22',
        points: 12,
        idCategory: 1,
        idChildNote: null,
        idParentNote: null
    },
    editMission: {
        idMission: 1,
        idParent: 1,
        idChild: 2,
        name: 'Ranger le lave vaisselle',
        startDate: '30-12-22',
        endDate: '30-12-22',
        points: 50,
        idCategory: 2,
        idChildNote: null,
        idParentNote: null
    },
    deleteMission: 204,
    createContract: {
        id: 1,
        idParent: 1,
        idChild: 2,
        childSignature: 0,
        parentSignature: 0,
        content: "Ce contrat permet de définir les termes de l'engagement entre le parent et l'enfant",
        weeklyPoints: 22,
        idStatus: 1,
        dollarPerPoint: 1
    },
    getContractById: {
        id: 1,
        idParent: 1,
        idChild: 2,
        childSignature: 0,
        parentSignature: 0,
        content: "Ce contrat permet de définir les termes de l'engagement entre le parent et l'enfant",
        weeklyPoints: 22,
        idStatus: 1,
        dollarPerPoint: 1
    },
    editContract: {
        id: 1,
        idParent: 1,
        idChild: 2,
        childSignature: 0,
        parentSignature: 0,
        content: "Ce contrat permet de définir les termes de l'engagement entre le parent et l'enfant",
        weeklyPoints: 10,
        idStatus: 1,
        dollarPerPoint: 2
    },
    cloneContract: {
        id: 3,
        idParent: 1,
        idChild: 2,
        childSignature: 0,
        parentSignature: 0,
        content: "Ce contrat permet de définir les termes de l'engagement entre le parent et l'enfant",
        weeklyPoints: 10,
        idStatus: 1,
        dollarPerPoint: 2
    }
}
export const createMission = (props: ICreateMissionProps) => {
    return exampleResponse.createMission;
}
export const getAllMissionsByUserId = (props: IGetAllMissionsByUserIdProps) => {
    return exampleResponse.getAllMissionsByUserId;

}
export const editMission = (props: IEditMissionProps) => {
    return exampleResponse.editMission;
}
export const deleteMission = (props: IDeleteMissionProps) => {
    return exampleResponse.deleteMission;
}
export const createContract = (props: ICreateContractProps) => {
    return exampleResponse.createContract;
}
export const getContractById = (props: IGetContractByIdProps) => {
    return exampleResponse.getContractById;
}
export const cloneContract = (props: ICloneContractProps) => {
    return exampleResponse.cloneContract;
}
