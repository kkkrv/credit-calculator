import { render, unmountComponentAtNode } from "react-dom";
import ResultCard from "./ResultCard/ResultCard";
import {act} from "@testing-library/react";
import React from "react";

let container = document.createElement("div");

beforeAll(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  document.body.appendChild(container);
});

describe("Check result calculation", () => {
  act(() => {
    render(<ResultCard cost="1000000"
                       initialFee="120000"
                       term="4"
                       rate="12.7" />, container);
  });

  it("Credit body is calculated correctly", () => {
    const creditBody = document.getElementsByClassName('credit-value')[0];
    expect(creditBody.textContent).toBe("880000");
  });

  it("Monthly Fee is calculated correctly", () => {
    const monthlyFee = document.getElementsByClassName('monthly-fee-value')[0];
    expect(monthlyFee.textContent).toBe("23477.377");
  });

  it("Income is calculated correctly", () => {
    const income = document.getElementsByClassName('income-value')[0];
    expect(income.textContent).toBe("39128.962");
  });

  it("Overpayment is calculated correctly", () => {
    const overpayment = document.getElementsByClassName('overpayment-value')[0];
    expect(overpayment.textContent).toBe("246914.096");
  });
});

afterAll(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});