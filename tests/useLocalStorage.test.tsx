import React from 'react'
import { fireEvent, render } from "@testing-library/react"; 
import useLocalStorage from '../src';

function Component() {
    const [value, setValue] = useLocalStorage("test", 1)
    return (
        <>
            <p>{value}</p>
            <button id="increment-button" onClick={() => setValue((prev:number = 0) => prev + 1)}>Increment</button>
        </>
    )
}

describe("useLocalStorage", () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it("Returns expected value and render from passed parameters", () => {
        const { container } = render(<Component />);
        expect(localStorage.getItem("test")).toEqual(JSON.stringify(1))
    })
    it("Updates key in local storage when input is clicked", () => {
        const { container } = render(<Component />);
        fireEvent.click(container.querySelector("#increment-button")!);
        expect(localStorage.getItem("test")).toEqual(JSON.stringify(2))
    })
})