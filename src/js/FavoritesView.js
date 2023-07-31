import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.update();
    this.onAdd()
    this.notFavorite()
  }

 

  onAdd(){
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = ()=>{
      const {value} = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  update() {
    this.removeAllTr();
    this.notFavorite();

    this.entries.forEach((user) => {
      const { login, name, public_repos, followers } = user;
      const row = this.createRow(login, name, public_repos, followers);
      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOk) {
          this.delete(user);
        }
      };
      this.tbody.append(row);
    });
  }

  createRow(login, name, public_repos, followers) {
    const tr = document.createElement("tr");

    tr.innerHTML = `    
          <td class="user">
            <img src="https://github.com/${login}.png" alt="Avatar">
            <a href="https://github.com/${login}" target="_blank">
              <p>${name}</p>
              <span>${login}</span>
            </a>
          </td>
          <td class="repositories">
          ${public_repos}
          </td>
          <td class="followers">
          ${followers}
          </td>
          <td>
            <a class="remove">
             Remover
            </a>
          </td>      
    `;
    return tr;
  }
  notFavorite() {
    if(this.entries <= 0) {
      this.root.querySelector('.not-favorite').classList.remove('hide')
    } else {
      this.root.querySelector('.not-favorite').classList.add('hide')

    }
  }
  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });    
  }

 
}
