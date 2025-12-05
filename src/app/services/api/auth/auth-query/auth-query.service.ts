import { Injectable, signal, inject, computed } from "@angular/core";
import { QueryClient, injectQuery, injectMutation } from "@tanstack/angular-query-experimental";
import { AuthService } from "../auth-service/auth.service";
import { LoginRequest, RegisterRequest } from "../../../../lib/interfaces/IAuth";
import { ToastService } from "../../../toast-service/toast-service.service";

@Injectable({
    providedIn: "root",
})
export class AuthQueryService {
    private readonly authService = inject(AuthService);
    private readonly queryClient = inject(QueryClient);
    private readonly toast = inject(ToastService);

    token = signal<string | null>(localStorage.getItem("token"));
    user = signal<any | null>(null);

    isAuthenticated = computed(() => !!this.token());

    private saveSession(token: string, user: any) {
        this.token.set(token);
        this.user.set(user);
        localStorage.setItem("token", token);
    }

    private clearSession() {
        this.token.set(null);
        this.user.set(null);
        localStorage.removeItem("token");
    }

    fetchAuthenticatedUser = injectQuery(() => ({
        queryKey: ['auth', 'me', this.token()],
        queryFn: () => this.authService.me(),
        enabled: !!this.token(),
        refetchOnWindowFocus: false,

        select: (user) => {
            this.user.set(user);
            return user;
        },

        retry: 0,
        onError: () => {
            this.clearSession();
        }
    }));


    login = injectMutation(() => ({
        mutationFn: (payload: LoginRequest) => this.authService.login(payload),
        onSuccess: (auth) => {
            this.saveSession(auth.token, auth.user);
            this.toast.success("Login realizado com sucesso!");
            this.queryClient.invalidateQueries();
        },
        onError: () => {
            this.toast.error("Credenciais inválidas.");
        },
    }));

    register = injectMutation(() => ({
        mutationFn: (payload: RegisterRequest) => this.authService.register(payload),
        onSuccess: (auth) => {
            this.saveSession(auth.token, auth.user);
            this.toast.success("Conta criada com sucesso!");
            this.queryClient.invalidateQueries();
        },
        onError: () => {
            this.toast.error("Erro ao criar conta.");
        },
    }));

    logout() {
        this.clearSession();
        this.queryClient.clear();
        this.toast.success("Você saiu da sua conta.");
    }
}
