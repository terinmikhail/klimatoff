import { searchValue, setSearchValue } from '../../../stores/SearchStore';

interface SearchProps {
    onSearch?: (search: string) => void;
}

export default function Search(props: SearchProps) {
    const handleInput = (e: Event) => {
        const value = (e.currentTarget as HTMLInputElement).value;
        setSearchValue(value);
        props.onSearch?.(value);
    };

    return (
        <div class="relative w-full max-w-lg">
            {/* Иконка поиска */}
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                <svg
                    class="w-5 h-5 text-gray-400"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15 15L11 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </div>

            {/* Поле ввода */}
            <input
                type="text"
                placeholder="Поиск..."
                value={searchValue()}
                onInput={handleInput}
                class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent placeholder-gray-400
                       shadow-sm hover:shadow transition-shadow duration-200"
            />
        </div>
    );
}