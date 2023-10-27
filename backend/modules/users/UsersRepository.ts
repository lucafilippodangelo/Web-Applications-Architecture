import {IUser, UserModel} from "../../models/User";
import {Promise} from "mongoose";

export interface IUsersRepository {
    findUserByEmail(email: string): Promise<IUser | null>

    createUser(user: IUser): Promise<void>

    deleteUser(id: string): Promise<void>

    findUsers(): Promise<IUser[]>
}

class UsersRepositoryInternal implements IUsersRepository {

    async createUser(user: IUser): Promise<void> {

        const model = new UserModel(user);
        await model.save();

    }

    async deleteUser(id: string): Promise<void> {

        await UserModel.deleteOne({id});

    }

    findUserByEmail(email: string): Promise<IUser | null> {

        return UserModel.findOne({email});

    }

    findUsers(): Promise<IUser[]> {

        return UserModel.find({});

    }

}

export const UsersRepository = new UsersRepositoryInternal() as IUsersRepository;