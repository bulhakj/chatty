import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import { config } from "@root/config";
import { joiValidation } from "@global/decorators/joi-validation.decorators";
import { authService } from "@service/db/auth.service";
import HTTP_STATUS from "http-status-codes";
import { BadRequestError } from "@global/helpers/error-handler";
import { loginSchema } from "@auth/schemes/signin";
import { IAuthDocument } from "@auth/interfaces/auth.interface";
import { userService } from "@service/db/user.service";
import { IUserDocument } from "@auth/user/interfaces/user.interface";

export class SignIn {
  @joiValidation(loginSchema)
  public async read(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const existingUser: IAuthDocument = await authService.getAuthUserByUsername(username);
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordsMatch: boolean = await existingUser.comparePassword(password);
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    const user: IUserDocument = await userService.getUserByAuthId(`${existingUser.id}`);

    const userJWT: string = JWT.sign(
      {
        userId: user._id,
        uId: existingUser.uId,
        email: existingUser.email,
        username: existingUser.username,
        avatarColor: existingUser.avatarColor
      },
      config.JWT_TOKEN!
    );

    const userDocument: IUserDocument = {
      ...user,
      authId: existingUser!._id,
      username: existingUser!.username,
      email: existingUser!.email,
      avatarColor: existingUser!.avatarColor,
      uId: existingUser!.uId,
      createdAt: existingUser!.createdAt
    } as IUserDocument;

    req.session = { jwt: userJWT };
    res.status(HTTP_STATUS.OK).json({ message: "User logged in succesfully", user: userDocument, token: userJWT });
  }
}
