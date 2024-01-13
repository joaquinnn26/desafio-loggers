import { uManager } from "../DAL/dao/mongo/users.dao.js";
import { cManager } from "../DAL/dao/mongo/carts.dao.js";
import RequestDto from "../DAL/dtos/request.dto.js";
import ResponseDto from "../DAL/dtos/response.dto.js";
import { hashData } from "../utils.js";

export default class UsersRepository {
    
    async findById(id) {
        const user = uManager.findUserByID(id);
        return user
    }

    async findByEmail(id) {
        const user = uManager.findUserByEmail(id);
        return user
    }

    async createOne(user) {
      const hashPassword = await hashData(user.password);
      const createdCart = await cManager.createCart()
      const userDto = new RequestDto(
        { ...user, 
          cart: createdCart._id,
          password: hashPassword });
      
      const createdUser = await uManager.createUser(userDto);
      return createdUser;
    }    
    
}