export const handlePaymentType = (payments) => {
  let type = null;

  (payments ?? [])?.forEach(({ data: { credit_card, paypal } }) => {
    if (credit_card !== null) {
      type = "credit_card";
      return type;
    }
    if (paypal !== null) {
      type = "paypal";
      return type;
    }
    type = "cash";
    return type;
  });

  return type;
};

export const handlePaymentStatus = (payments, payment_type) => {
  let data_tmp = {};

  (payments ?? [])?.forEach((payment) => {
    let {
      data,
      data: { status_info },
    } = payment;

    if (data?.[payment_type]) {
      if (status_info) {
        data_tmp[payment_type] = status_info;
      }
    } else {
      let info = "success";
      data_tmp[payment_type] = { status_info: info };
    }
  });
  return data_tmp;
};

export const handlePaymentText = (payment_type, status, fields) => {
  let data_tmp;
  if (status === "success") {
    data_tmp = {
      title: "You successfully placed an order!",
      image: "/uspesno.png",
      subtitle: "Thank you for your trust.",
      text_line_1: null,
      text_line_2:
        'For all additional information, feel free to contact us at <a href="mailto:info@alesari.com">info@alesari.com</a>',
      button: "Back to home",
      payment_info: {
        status: status,
      },
    };
  } else {
    data_tmp = {
      title: "You successfully placed an order!",
      subtitle: "Thank you for your trust.",
      image: "/uspesno.png",
      text_line_2:
        'For all additional information, feel free to contact us at <a href="mailto:info@alesari.com">info@alesari.com</a>',

      button: "Back to home",
      payment_info: {
        status: status,
      },
    };
  }

  switch (payment_type) {
    case "credit_card":
      return handlePaymentCreditCardText(data_tmp, fields, status);
    case "paypal":
      return handlePaymentPaypalText(data_tmp, fields, status);
    default:
      return handlePaymentCashText(data_tmp, fields, status);
  }
};

export const handlePaymentCreditCardText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "You have successfully completed the payment. Your payment card account has been charged!",
          fields_title: "Transaction Details:",
          fields: [...fields],
        },
      };
    default:
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "Payment unsuccessful. Your payment card account has not been charged!",
          description:
            "Your purchase has been successfully recorded, but the payment with your payment card was not completed. We will contact you soon to finalize your purchase.",
          fields_title: "Transaction Details:",
          fields: [...fields],
        },
      };
  }
};

export const handlePaymentPaypalText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "You have successfully completed the payment via PayPal. Your account has been charged!",
          fields: [],
        },
      };
    default:
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "You have successfully completed the payment via PayPal. Your account has been charged!",
          description:
            "Your purchase has been successfully recorded, but the payment with your payment card was not completed. We will contact you soon to finalize your purchase.",
          fields: [],
        },
      };
  }
};

export const handlePaymentCashText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        text_line_1: "We will contact you soon to provide further information.",
      };
    default:
      return {
        ...data_tmp,
        text_line_1: "We will contact you soon to provide further information.",
      };
  }
};
