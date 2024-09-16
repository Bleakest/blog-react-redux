import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useState } from "react";
import styled from "styled-components";
import { Button, H2, Input, AuthFormError } from "../../components";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions";
import { SelectUserRole } from "../../selectors";
import { ROLE } from "../../constans";
import { useResetForm } from "../../hooks";

const regFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/\w+$/, "Неверный логин")
    .min(3, "Минимум 3 символа")
    .max(15, "Максимум 15 символов"),
  password: yup
    .string("Заполните пароль")
    .matches(/^[\w#%]+$/, "Неверно заполнен пароль")
    .min(6, "Минимум 6 символов")
    .max(30, "Максимум 30 символов"),
  passCheck: yup
    .string()
    .required("Заполните повторно пароль")
    .oneOf([yup.ref("password"), null], "Пароль не совпадает"),
});

const RegistrationContainer = ({ className }) => {
  const [serverError, setServerError] = useState(null);
  const roleId = useSelector(SelectUserRole);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passCheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    server.register(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }
      dispatch(setUser(res));
    });
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passCheck?.message;

  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Регистрация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Проверка пароля..."
          {...register("passCheck", {
            onChange: () => setServerError(null),
          })}
        />
        <Button disabled={formError} type="submit">
          Зарегистрироваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
      </form>
    </div>
  );
};

export const Registration = styled(RegistrationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
