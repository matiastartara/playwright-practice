import { test, expect } from '@playwright/test';


test.describe("API Testing with Playwright", () => {

    const baseurl = "https://reqres.in/api";
    const headers = {'x-api-key': 'reqres-free-v1'};

    test("GET API Request with - Valid 200 Response ", async ({ request }) => {
        const response = await request.get(`${baseurl}/users/2`, { headers });
        expect(response.status()).toBe(200);
    });

    test("GET API Request with - InValid 404 Response ", async ({ request }) => {
        const response = await request.get(`${baseurl}/users/23`);
        expect(response.status()).toBe(401);
    });

    test("GET Request - Verify User detils ", async ({ request }) => {
        const response = await request.get(`${baseurl}/users/2`,{ headers });
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe("Janet");
        expect(responseBody.data.last_name).toBe("Weaver");
        expect(responseBody.data.email).toBeTruthy();
    });

    test("POST Request - Register User", async ({ request }) => {
        const payload = {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        };

        const response = await request.post(`${baseurl}/register`, {
            data: payload,
            headers
        });

        expect(response.status(), 'Should return 200 for successful registration').toBe(200);
        const body = await response.json();
        expect(body).toEqual({
            id: 4,
            token: 'QpwL5tke4Pnpja7X4'
        });

    });

})