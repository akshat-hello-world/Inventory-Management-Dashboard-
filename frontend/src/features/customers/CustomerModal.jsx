// import Modal from "../../components/ui/Modal";
// import CustomerForm from "./CustomerForm";

// const CustomerModal = ({
//   isOpen,
//   customer,
//   onClose,
//   onSuccess,
// }) => {
//   const handleSuccess = async () => {
//     if (onSuccess) {
//       await onSuccess();
//     }

//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={
//         customer
//           ? "Edit Customer"
//           : "Add Customer"
//       }
//     >
//       <CustomerForm
//         customer={customer}
//         onSuccess={handleSuccess}
//         onCancel={onClose}
//       />
//     </Modal>
//   );
// };

// export default CustomerModal;
import Modal from "../../components/ui/Modal";
import CustomerForm from "./CustomerForm";
import { createCustomer, updateCustomer } from "./api";

const CustomerModal = ({
  isOpen,
  customer,
  onClose,
  onSuccess,
}) => {
  const handleSubmit = async (values) => {
    if (customer) {
      await updateCustomer(customer.id, values);
    } else {
      await createCustomer(values);
    }

    if (onSuccess) {
      await onSuccess();
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={customer ? "Edit Customer" : "Add Customer"}
    >
      <CustomerForm
        initialValues={customer}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default CustomerModal;