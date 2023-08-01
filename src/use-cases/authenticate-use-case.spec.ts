import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InvalidCredentialsError } from "./_errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase; // SUT means System Under Test

describe("Authenticate use case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it("should be able to authenticate", async () => {
        await usersRepository.create({
            name: "John Doe",
            username: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        });

        const { user } = await sut.execute({
            email: "johndoe@example.com",
            password: "123456",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it("should not be able to authenticate with wrong email", async () => {
        await expect(() => {
            return sut.execute({
                email: "johndoe@example.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it("should not be able to authenticate with wrong password", async () => {
        await usersRepository.create({
            name: "John Doe",
            username: "John Doe",
            email: "johndoe@example.com",
            password_hash: await hash("123456", 6),
        });

        await expect(() => {
            return sut.execute({
                email: "johndoe@example.com",
                password: "987987",
            });
        }).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
