import { useClickAway, useToggle } from '@uidotdev/usehooks';
import { Clean, ColorFill } from '@blueprintjs/icons';
import { useTheme } from '../utils/theme-hook';

type Action = {
  label: string;
  icon: React.ReactElement;
  callback: () => void;
};

export const FloatingActions = () => {
  const toggleTheme = useTheme();
  const [dropdownVisible, toggleVisible] = useToggle(false);
  const ref = useClickAway(() => toggleVisible(false));

  const actions: Action[] = [
    {
      label: 'Resetar Layout',
      icon: <Clean />,
      callback() {
        window.location.reload();
        localStorage.removeItem('mosaic');
      },
    },
    {
      label: 'Alterar Cores',
      icon: <ColorFill />,
      callback: () => toggleTheme(),
    },
  ];

  const callAndClose = (cb: Action['callback']) => {
    cb();
    toggleVisible(false);
  };

  return (
    <div data-dial-init className="fixed bottom-4 left-4 z-40">
      <div
        ref={ref as any}
        id="speed-dial-menu-dropdown"
        data-visible={dropdownVisible}
        className="flex flex-col hidden data-[visible=true]:block py-1 mb-2 space-y-2 bg-slate-700 border border-slate-500 rounded-lg shadow-sm "
      >
        <ul className="text-sm text-gray-200 hover:text-white px-2">
          {actions.map(({ label, icon, callback }) => (
            <li
              onClick={() => callAndClose(callback)}
              className="group cursor-pointer"
              key={label}
            >
              {icon}
              <span className="ml-2 text-sm font-medium group-hover:underline">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-dropdown"
        aria-controls="speed-dial-menu-dropdown"
        aria-expanded="false"
        onClick={() => toggleVisible(true)}
        className="flex items-center justify-center text-white bg-slate-700 rounded-full w-10 h-10 hover:bg-slate-800 focus:ring-4 focus:ring-slate-500 focus:outline-none"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
};
