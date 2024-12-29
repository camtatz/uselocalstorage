
# @ctatz/uselocalstorage

A tiny package that provides a hook that interacts with localStorage.


## Installation

Install with npm

```bash
  npm install uselocalstorage
```
    
## Usage/Examples

```jsx
import useLocalStorage from 'uselocalstorage'

function Component() {
    const [value, setValue] = useLocalStorage("test", 1)
    return (
        <>
            <p>{value}</p>
            <button id="increment-button" onClick={() => setValue((prev:number = 0) => prev + 1)}>Increment</button>
        </>
    )
}
```

If you prefer you can also pass an optional options parameter to set your own serializer, parser and logger.

```jsx
const [value, setValue] = useLocalStorage("test", 1, {
    logger: console.log,
    parser: JSON.parse,
    serializer: JSON.stringify
})
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

