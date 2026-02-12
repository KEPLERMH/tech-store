import { SlidersHorizontal } from "lucide-react"
import type { UseFormRegister } from "react-hook-form"
import type { FiltersForm } from "../types/filters"


type FiltersProps = {
    categories: string[];
    register: UseFormRegister<FiltersForm>
}

const Filters = ({ categories, register }: FiltersProps) => {
    // const serach = watch("search");
    // console.log(serach);
    return (
        <form className="">
            <fieldset className=" p-5 rounded-xl flex flex-col gap-3 border border-gray-200 shadow-(--shadow-card)">
                <div className="flex gap-2">
                    <SlidersHorizontal className=" w-6 h-6 text-primary-blue" />
                    <span className="font-medium text-xl">Filters</span>
                </div>
                <div className="md:grid md:grid-cols-3 md:gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="search" className="text-sm mx-1">Buscar producto</label>
                        <input
                            id="search"
                            type="text"
                            {...register("search")}
                            placeholder="Buscar por nombre"
                            className="border border-black/20 text-sm rounded-lg px-3 py-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="category" className="text-sm mx-1">Categoria</label>
                        <select {...register('category')} id="category" className="border border-black/20 text-sm rounded-lg px-3 py-3 outline-none">
                            <option value="">Todas</option>
                            {categories.map(category => <option key={category} value={category}>{category}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="order" className="text-sm mx-1">Ordenar por precio</label>
                        <select {...register("order")} id="order" className="border border-black/20 text-sm rounded-lg px-3 py-3 outline-none">
                            <option value="default">Por defecto</option>
                            <option value="asc">Menor a mayor</option>
                            <option value="desc">Mayor a menor</option>
                        </select>
                    </div>
                </div>
            </fieldset>
        </form>
    )
}

export default Filters
