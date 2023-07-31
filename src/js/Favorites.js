import { GithubUser } from "./GithubUser.js";


export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbody = this.root.querySelector("table tbody");
    this.load();
  }
  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }
  delete(user) {
    const filteredEntities = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    this.entries = filteredEntities;
    this.update();
    this.save();
  }
  save(){
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }
  async add(username){    
    try {
      const userExists = this.entries.find(entry => entry.login === username)

      if (userExists){
        throw new Error("User ja existe")
      }

      const user = await GithubUser.search(username);
      if(user.login === undefined || user.name === null){
        throw new Error("Usuário não encontrado");
      }
      console.log(user)
      this.entries = [user, ...this.entries];
      this.update()
      this.save()
    } catch (error) {
      alert(error.message)
    }
  }
}

