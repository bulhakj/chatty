import { BaseQueue } from "@service/queues/base.queue";
import { userWorker } from "@worker/user.worker";

class UserQueue extends BaseQueue {
  constructor() {
    super("user");
    this.processJobsInsideQueue("addUserToDB", 5, userWorker.addUserToDb);
  }

  public addUserJob(name: string, data: any): void {
    this.addJob(name, data);
  }
}

export const userQueue: UserQueue = new UserQueue();
