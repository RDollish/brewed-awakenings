import { getProducts, getEmployees, getOrders } from "./database.js"

// Get copy of state for use in this module
const products = getProducts()
const employees = getEmployees()
const orders = getOrders()


// Function whose responsibility is to find the product for an order
const findProduct = (order, products) => {
    let orderProduct = null

    for (const product of products) {
        if (product.id === order.productId) {
            orderProduct = product
        }
    }

    return orderProduct
}

// Function whose responsibility is to find the employee for an order
const findEmployee = (order, allEmployees) => {
    let orderEmployee = null

    for (const employee of allEmployees) {
        if (employee.id === order.employeeId) {
            orderEmployee = employee
        }
    }

    return orderEmployee
}

export const Orders = () => {
    let html = ""
    html += "<ul>"

    for (const order of orders) {
        const employee = findEmployee(order, employees)
        const product = findProduct(order, products)

        html += `<li>${product.name} was sold by ${employee.name} on ${new Date(order.timestamp).toLocaleDateString()}</li>`
    }


    html += "</ul>"

    return html
}

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("employee")) {

            const [,employeePrimaryKey] = itemClicked.id.split("--")

            let matchingEmployee = null
            for (const employee of employees) {
                if (parseInt(employeePrimaryKey) === employee.id) {
                    matchingEmployee = employee
                }
            }

            let orderNum = 0
            for (const order of orders) {
                if (order.employeeId === matchingEmployee.id) {
                    ++ orderNum
                }
            }

            window.alert(`${matchingEmployee.name} has sold ${orderNum} drink(s)!`)
        }
    }

)

