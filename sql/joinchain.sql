SELECT DISTINCT products.ProductName, categories.CategoryName, customers.CustomerName, customers.ContactName, order_details.Quantity, order_details.OrderID
FROM products INNER JOIN order_details on order_details.ProductID = products.ProductID
              INNER JOIN categories on categories.CategoryID = products.CategoryID
              INNER JOIN orders on orders.OrderID = order_details.OrderID
              INNER JOIN customers on orders.CustomerID = customers.CustomerID
WHERE customers.CustomerID BETWEEN 1 AND 10
--GROUP BY categories.CategoryID 
ORDER BY orders.OrderID;
