import { Company, User, Job, SignUpUser } from "~/@types/types";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token: string | null = null;

  static async request(endpoint: string, data = {}, method = "GET"): Promise<any> {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get and return a list of all companies */

  static async getCompanies(nameLike: string): Promise<Company[]> {
    const filteredData =
      (Object.entries({ nameLike })
        .filter(([_, value]) => value !== undefined && value !== ""));

    console.log('filteredData in getCompanies', filteredData);
    let res = await this.request(`companies`, Object.fromEntries(filteredData));

    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle: string): Promise<Company> {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all jobs */

  static async getJobs(title: string): Promise<Job[]> {
    const filteredData =
      (Object.entries({ title })
        .filter(([_, value]) => value !== undefined && value !== ""));

    let res = await this.request(`jobs`, Object.fromEntries(filteredData));

    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username: string, id: number): Promise<void> {
    await this.request(`users/${username}/jobs/${id}`, {}, "POST");
  }

  /** Get token for login from username, password. */

  static async login(data: { username: string, password: string; }): Promise<string> {
    let res = await this.request(`auth/token`, data, "POST");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data: SignUpUser): Promise<string> {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username: string, data: User): Promise<User> {
    let res = await this.request(`users/${username}`, data, "PATCH");
    return res.user;
  }
}


export default JoblyApi;
