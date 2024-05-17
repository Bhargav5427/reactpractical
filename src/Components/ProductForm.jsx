import { Button, Grid, ListItem } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { DeleteData, PostData } from "../ReduxToolkit/Slice/reduxSlice";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const { data, isError, isLoading } = useSelector(
    (state) => state.product.product
  );
  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const mappedData = data.map((item) => ({
        id:item.id,
        name: item.product_name,
        description: item.product_details,
        price: item.price,
      }));
      setRows(mappedData);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObject = {
      product_name: formData.name,
      product_details: formData.description,
      price: parseFloat(formData.price),
    };

    dispatch(PostData({ payload: dataObject }));

    // Reset form fields
    setFormData({
      name: "",
      description: "",
      price: "",
    });
  };

  let handleDelete =(id) => {
    dispatch(DeleteData({  id }));
  }

  return (
    <Grid container spacing={2} columns={12} sx={{ flexGrow: 1 }}>
      <Grid item xs={4}>
        <ListItem>
          <div className="add-product">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Product name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Watch name"
                  required
                />
              </div>

              <div>
                <label>Product description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Sample description..."
                  required
                ></textarea>
              </div>

              <div>
                <label>Product price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="33.50"
                  required
                />
              </div>

              <button type="submit">Add</button>
            </form>
          </div>
        </ListItem>
      </Grid>
      <Grid item xs={8} padding={5}>
        <ListItem>
          <TableContainer component={Paper} sx={{ border: "1px solid gray" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Product Details</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">upadte</TableCell>
                  <TableCell align="center">delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
                      <Button size="md" color="primary">
                        Upadte
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        size="md"
                        color="danger"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default ProductForm;
