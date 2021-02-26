import { Link } from 'react-router-dom';
import image404 from '../image404.svg';

function TodoList() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center relative overflow-hidden select-none">
      <img className="absolute w-60 -left-10 -bottom-10 z-auto" src={image404} alt="404 page" />
      <span className="text-9xl z-10 font-extrabold text-blue-300">404</span>
      <Link to="/" className="underline z-10">← ke halaman utama</Link>
    </div>
  );
}

export default TodoList;
