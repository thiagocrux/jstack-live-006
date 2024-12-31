import { prismaClient } from '../libs/prismaClient';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists();
    }

    await prismaClient.account.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
