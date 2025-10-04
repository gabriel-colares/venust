/** ========= Convenções gerais ========= */
export type EpochMillis = number;

export type DiaSemana = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom";

export type PapelMembro =
  | "owner"
  | "admin"
  | "barbeiro"
  | "atendente"
  | "financeiro"
  | "leitor";

export type StatusPublicacao = "rascunho" | "publicado" | "suspenso";

export type EstadoAgendamento =
  | "pendente"
  | "confirmado"
  | "concluido"
  | "cancelado"
  | "no-show";

export type FonteAgendamento = "online" | "interno" | "whatsapp";

export type StatusReview = "pendente" | "aprovado" | "rejeitado";

export type TipoLink = "agendar" | "catalogo" | "whatsapp" | "perfil";

export type StatusAssinatura = "trial" | "ativa" | "inadimplente" | "cancelada";

export type StatusFatura = "aberto" | "pago" | "falhou" | "reembolsado";

export type MetodoPagamento = "pix" | "cartao" | "boleto";

export type CanalNotificacao = "whatsapp" | "email";

export type CanalConfirmacao = "wa.me" | "email" | "telefone";

export type GatewayPagamento = "stripe" | "mercadopago" | "manual";

export type PlanoCodigo = "mensal" | "trimestral" | "semestral";

/** Auditoria/soft delete padrão para a maioria dos docs do app */
export interface BaseDoc {
  criadoEm: EpochMillis;
  atualizadoEm?: EpochMillis;
  criadoPor?: string; // uid em users/{id}
  atualizadoPor?: string; // uid em users/{id}
  excluido?: boolean;
  excluidoEm?: EpochMillis;
}

/* ==========================================
   ROOT COLLECTIONS
   ========================================== */

/**
 * users/{id}
 * Doc canônico de usuário mantido pelo Firebase Adapter (NextAuth).
 * Podemos estender com campos do app.
 */
export interface AuthUserDoc {
  // Padrão do adapter
  name?: string | null;
  email?: string | null;
  emailVerified?: EpochMillis | null; // alguns adapters usam Date; padronizamos ms
  image?: string | null;

  // Campos do app (opcionais)
  telefone?: string | null;
  preferencias?: { tema?: "dark" | "light" };
  claims?: { globalRole?: "suporte" | "admin" | "operacao" };

  // Auditoria (opcional)
  criadoEm?: EpochMillis;
  atualizadoEm?: EpochMillis;
}

/** barbearias/{barbeariaId} */
export interface BarbeariaDoc extends BaseDoc {
  nome: string;
  slug: string;
  descricao?: string;
  fotoCapaUrl?: string;
  galeria?: string[];
  telefone?: string;
  whatsapp?: string;
  email?: string;
  endereco?: {
    logradouro?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    complemento?: string;
    geo?: { lat: number; lng: number };
    geohash?: string;
  };
  statusPublicacao: StatusPublicacao;
  configBusca?: { palavrasChave?: string[]; precoMedio?: number };
  avaliacoes?: { media: number; quantidade: number };
  capacidadeSimultanea?: number;
  linksExternos?: { instagram?: string; site?: string };
  ownerId: string; // userId (users/{id})
}

/** planos/{planoId} */
export interface PlanoDoc extends BaseDoc {
  nome: string; // "Mensal", "Trimestral", "Semestral"
  codigo: PlanoCodigo;
  periodoDias: number; // 30, 90, 180...
  preco: number; // ex.: 49.9
  recursos?: string[];
  ativo: boolean;
}

/** busca_index/{barbeariaId} — índice público de busca */
export interface BuscaIndexDoc {
  barbeariaId: string;
  nome: string;
  slug: string;
  cidadeUF?: string;
  bairro?: string;
  geohash?: string;
  nota?: number;
  avaliacoes?: number;
  precoMedio?: number;
  fotoCapaUrl?: string;
  servicosPrincipais?: string[];
  abertoAgora?: boolean;
  atualizadoEm: EpochMillis;
}

/** campanhas/{campanhaId} (opcional) */
export interface CampanhaDoc extends BaseDoc {
  nome: string;
  ativa: boolean;
  alvo?: { cidade?: string; uf?: string } | null;
}

/* ==========================================
   SUBCOLEÇÕES DE barbearias/{id}
   ========================================== */

export type AlvoBloqueio =
  | { tipo: "barbearia"; id: null }
  | { tipo: "profissional"; id: string };

export interface MembroDoc extends BaseDoc {
  barbeariaId: string; // redundante p/ collection group
  papel: PapelMembro;
  apelido?: string;
  ativo: boolean;
  permissoesExtras?: string[];
}

/** profissionais */
export interface ProfissionalDoc extends BaseDoc {
  barbeariaId: string;
  nome: string;
  fotoUrl?: string;
  bio?: string;
  servicos?: string[]; // ids de servicos
  duracaoPadraoMin?: number;
  capacidadeSimultanea?: number;
  diasTrabalho?: DiaSemana[];
  slug: string;
  avaliacoes?: { media: number; quantidade: number };
  ativo: boolean;
}

/** servicos */
export interface ServicoDoc extends BaseDoc {
  barbeariaId: string;
  nome: string;
  descricao?: string;
  duracaoMin: number;
  preco: number;
  ativo: boolean;
  ordem?: number;
  slug: string;
}

/** clientes */
export interface ClienteDoc extends BaseDoc {
  barbeariaId: string;
  nome: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
  anotacoes?: string;
  ultimaVisitaEm?: EpochMillis;
  totalAgendamentos?: number;
  noShowCount?: number;
}

/** horarios/padrao (doc único) */
export interface HorariosDoc extends BaseDoc {
  funcionamento: Record<DiaSemana, Array<{ abre: string; fecha: string }>>;
  intervaloMin: number;
  bufferMin: number;
}

/** bloqueios */
export interface BloqueioDoc extends BaseDoc {
  barbeariaId: string;
  titulo?: string;
  inicio: EpochMillis;
  fim: EpochMillis;
  alvo: AlvoBloqueio;
  motivo?: string;
  recorrencia?: string | null; // RRULE
}

/** agendamentos */
export interface AgendamentoDoc extends BaseDoc {
  barbeariaId: string;
  clienteId: string;
  clienteNome: string; // denormalizado
  profissionalId: string;
  servicoId: string;
  servicoNome: string; // denormalizado
  preco: number;
  inicio: EpochMillis;
  fim: EpochMillis;
  estado: EstadoAgendamento;
  fonte: FonteAgendamento;
  observacoes?: string;
  overbooking?: boolean;
  canalConfirmacao?: CanalConfirmacao;
  urlResumoPublico?: string;
  historico?: Array<{ t: EpochMillis; acao: string; por?: string }>; // por = userId
}

/** reviews */
export interface ReviewDoc extends BaseDoc {
  barbeariaId: string;
  clienteId: string;
  nota: number; // 1..5
  comentario?: string;
  profissionalId?: string | null;
  status: StatusReview;
}

/** links */
export interface LinkDoc extends BaseDoc {
  barbeariaId: string;
  tipo: TipoLink;
  slug: string;
  destino: string;
  utms?: { src?: string; cmp?: string; m?: string };
  cliques?: number;
  ativo: boolean;
}

/** config/app (doc único) */
export interface ConfigDoc extends BaseDoc {
  aceitaOverbooking?: boolean;
  maxOverbooking?: number;
  lembretes?: {
    whatsapp?: { ativo: boolean; antecedenciaMin: number };
    email?: { ativo: boolean; antecedenciaMin: number };
  };
  politicaCancelamento?: { limiteHoras?: number; multa?: number };
  publicacaoAutomatica?: boolean;
}

/** assinaturas */
export interface AssinaturaDoc extends BaseDoc {
  barbeariaId: string;
  planoId: PlanoCodigo;
  status: StatusAssinatura;
  inicio: EpochMillis;
  fim: EpochMillis;
  trialAte?: EpochMillis | null;
  gateway: GatewayPagamento;
  referenciaGateway?: string;
  renovacaoAutomatica?: boolean;
}

/** faturas */
export interface FaturaDoc extends BaseDoc {
  barbeariaId: string;
  competencia: string; // "YYYY-MM"
  valor: number;
  status: StatusFatura;
  vencimento: EpochMillis;
  pagoEm?: EpochMillis;
  metodo?: MetodoPagamento;
  referenciaGateway?: string;
}

/** notificacoes */
export interface NotificacaoDoc extends BaseDoc {
  barbeariaId: string;
  tipo:
    | "lembrete-agendamento"
    | "confirmacao-agendamento"
    | "assinatura-status"
    | "generica";
  canal: CanalNotificacao;
  destinatario: string; // telefone ou email
  payload?: Record<string, unknown>;
  status: "pendente" | "enviado" | "erro";
  erroMsg?: string;
}

/** webhooks */
export interface WebhookEventDoc extends BaseDoc {
  barbeariaId: string;
  provider: GatewayPagamento | "outro";
  tipo: string;
  referencia?: string;
  raw: unknown;
  processado?: boolean;
  processadoEm?: EpochMillis;
}

/** auditoria */
export interface AuditoriaDoc extends BaseDoc {
  barbeariaId: string;
  tipo: string; // "agendamento.criado" | ...
  por?: string; // userId
  alvo?: { colecao: string; id: string };
  antes?: unknown;
  depois?: unknown;
}

/** contadores/app (doc único, pequeno) */
export interface ContadoresDoc {
  agendamentosHoje?: number;
  noShowsMes?: number;
  visitasPerfil?: number;
}

/* ==========================================
   Caminhos tipados (paths) — utilitários
   ========================================== */

export type RootCollection =
  | "users"
  | "barbearias"
  | "planos"
  | "busca_index"
  | "campanhas";

export type BarbeariaSubcollection =
  | "membros"
  | "profissionais"
  | "servicos"
  | "clientes"
  | "horarios"
  | "bloqueios"
  | "agendamentos"
  | "reviews"
  | "links"
  | "config"
  | "assinaturas"
  | "faturas"
  | "notificacoes"
  | "webhooks"
  | "auditoria"
  | "contadores";

export type RootDocPath =
  | `users/${string}`
  | `barbearias/${string}`
  | `planos/${string}`
  | `busca_index/${string}`
  | `campanhas/${string}`;

export type BarbeariaSubcollectionPath<
  S extends BarbeariaSubcollection = BarbeariaSubcollection,
> = `barbearias/${string}/${S}`;

export type BarbeariaSubDocPath<
  S extends BarbeariaSubcollection = BarbeariaSubcollection,
> = `${BarbeariaSubcollectionPath<S>}/${string}`;

export type AnyDocPath = RootDocPath | BarbeariaSubDocPath;

/** Mapeia path -> tipo do documento (root) */
export type RootDocForPath<P extends RootDocPath> = P extends `users/${string}`
  ? AuthUserDoc
  : P extends `barbearias/${string}`
    ? BarbeariaDoc
    : P extends `planos/${string}`
      ? PlanoDoc
      : P extends `busca_index/${string}`
        ? BuscaIndexDoc
        : P extends `campanhas/${string}`
          ? CampanhaDoc
          : never;

/** Mapeia path -> tipo do documento (subcoleções) */
export type BarbeariaDocForPath<P extends BarbeariaSubDocPath> =
  P extends `barbearias/${string}/membros/${string}`
    ? MembroDoc
    : P extends `barbearias/${string}/profissionais/${string}`
      ? ProfissionalDoc
      : P extends `barbearias/${string}/servicos/${string}`
        ? ServicoDoc
        : P extends `barbearias/${string}/clientes/${string}`
          ? ClienteDoc
          : P extends `barbearias/${string}/horarios/${string}`
            ? HorariosDoc
            : P extends `barbearias/${string}/bloqueios/${string}`
              ? BloqueioDoc
              : P extends `barbearias/${string}/agendamentos/${string}`
                ? AgendamentoDoc
                : P extends `barbearias/${string}/reviews/${string}`
                  ? ReviewDoc
                  : P extends `barbearias/${string}/links/${string}`
                    ? LinkDoc
                    : P extends `barbearias/${string}/config/${string}`
                      ? ConfigDoc
                      : P extends `barbearias/${string}/assinaturas/${string}`
                        ? AssinaturaDoc
                        : P extends `barbearias/${string}/faturas/${string}`
                          ? FaturaDoc
                          : P extends `barbearias/${string}/notificacoes/${string}`
                            ? NotificacaoDoc
                            : P extends `barbearias/${string}/webhooks/${string}`
                              ? WebhookEventDoc
                              : P extends `barbearias/${string}/auditoria/${string}`
                                ? AuditoriaDoc
                                : P extends `barbearias/${string}/contadores/${string}`
                                  ? ContadoresDoc
                                  : never;

/** Union geral: retorna o tipo do doc para qualquer path */
export type DocForPath<P extends AnyDocPath> = P extends RootDocPath
  ? RootDocForPath<P>
  : P extends BarbeariaSubDocPath
    ? BarbeariaDocForPath<P>
    : never;

/* ==========================================
   (Opcional) Converters helpers p/ Firestore v9
   — descomente se quiser refs tipadas
   ========================================== */

// import type {
//   Firestore,
//   CollectionReference,
//   DocumentReference,
//   QueryDocumentSnapshot,
//   WithFieldValue,
// } from "firebase/firestore";

// export const converter = <T>() => ({
//   toFirestore: (data: WithFieldValue<T>) => data,
//   fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
// });

// export const typedCollection = <P extends RootCollection | BarbeariaSubcollectionPath>(
//   db: Firestore,
//   path: P
// ) => {
//   const { collection } = require("firebase/firestore") as typeof import("firebase/firestore");
//   type T = P extends `barbearias/${string}/${infer S extends BarbeariaSubcollection}`
//     ? BarbeariaDocForPath<`${P}/${string}`>
//     : P extends "users" ? AuthUserDoc
//     : P extends "barbearias" ? BarbeariaDoc
//     : P extends "planos" ? PlanoDoc
//     : P extends "busca_index" ? BuscaIndexDoc
//     : P extends "campanhas" ? CampanhaDoc
//     : never;
//   return collection(db, path).withConverter(converter<T>());
// };

// export const typedDoc = <P extends AnyDocPath>(db: Firestore, path: P) => {
//   const { doc } = require("firebase/firestore") as typeof import("firebase/firestore");
//   return doc(db, path).withConverter(converter<DocForPath<P>>());
// };
