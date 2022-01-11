import { render, screen } from '@testing-library/react'
import {ActiveLink} from "./index";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
})

describe("ActiveLink Component", () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink activeClassName={"active"} href={"/"}>
        <a>Home</a>
      </ActiveLink>
    )
    
    expect(getByText("Home")).toBeInTheDocument()
  })
  
  test('active link is receiving active class', () => {
    render(
      <ActiveLink activeClassName={"active"} href={"/"}>
        <a>Home</a>
      </ActiveLink>
    )
    
    expect(screen.getByText("Home")).toHaveClass('active')
  })
})

