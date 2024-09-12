import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, H2, Input } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { setUser } from "../../actions";
import { SelectUserRole } from "../../selectors";
import { ROLE } from "../../constans";

const authFormSchema = yup.object().shape({
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
});

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
  const [serverError, setServerError] = useState(null);
  const roleId = useSelector(SelectUserRole);
  const dispatch = useDispatch();
  const store = useStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  useEffect(() => {
    let currentWasLogout = store.getState().app.wasLogout;

    return store.subscribe(() => {
      let prevWasLogout = currentWasLogout;
      currentWasLogout = store.getState().app.wasLogout;

      if (currentWasLogout !== prevWasLogout) {
        reset();
      }
    });
  }, [reset, store]);

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(`Ошибка запроса: ${error}`);
        return;
      }
      dispatch(setUser(res));
    });
  };

  const formError = errors?.login?.message || errors?.password?.message;

  const errorMessage = formError || serverError;

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
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
        <Button disabled={!!formError} type="submit">
          Авторизоваться
        </Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
