interface MenuProps {
  username: string
}

export default function Menu({username}: MenuProps) {
  return (
    <div className="m-5 d-flex justify-content-between align-items-center">
      <div className="">
        <h2>ORM система сайта vegas.md</h2>
      </div>
      <div className="d-flex flex-column align-items-end">
        <h4>Добро пожаловать, <u className="text-primary text-underlined">{username ? username : 'Аноним'}</u>!</h4>
        <a href={username ? '/auth/logout' : '/auth/login'}>
          <button className="btn btn-primary mt-2 h5">{username ? 'Выйти' : 'Войти'}</button>
        </a>
      </div>
    </div>
  );
}
