/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "issues";

export interface Board {
  id: string;
  projectId: string;
}

export interface BoardId {
  boardId: string;
}

export interface ProjectId {
  projectId: string;
}

export interface ProjectIdAndUserId {
  projectId: string;
  userId: string;
}

export interface Column {
  id: string;
  boardId: string;
  name: string;
}

export interface ColumnId {
  columnId: string;
}

export interface BoardIdAndColumnName {
  boardId: string;
  columnName: string;
}

export interface ColumnIdAndName {
  columnId: string;
  columnName: string;
}

export interface SearchColumnsParams {
  boardId?: string | undefined;
  columnsIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface Issue {
  id: string;
  columnId: string;
  epicId: string;
  title: string;
  description: string;
}

export interface CreateIssueRequest {
  columnId: string;
  epicId: string;
  title: string;
  description: string;
}

export interface UpdateIssueRequest {
  issueId: string;
  title?: string | undefined;
  description?: string | undefined;
  columnId?: string | undefined;
  epicId?: string | undefined;
}

export interface IssueId {
  issueId: string;
}

export interface SearchIssuesParams {
  columnId?: string | undefined;
  epicId?: string | undefined;
  issuesIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface Epic {
  id: string;
  columnId: string;
  assigneeId?: string | undefined;
  reporterId: string;
  name: string;
  description?: string | undefined;
  startDate: Date | undefined;
  dueDate: Date | undefined;
}

export interface EpicId {
  epicId: string;
}

export interface CreateEpicRequest {
  columnId?: string | undefined;
  assigneeId?: string | undefined;
  reporterId: string;
  name: string;
  description?: string | undefined;
  startDate?: Date | undefined;
  dueDate?: Date | undefined;
}

export interface UpdateEpicRequest {
  epicId: string;
  columnId?: string | undefined;
  assigneeId?: string | undefined;
  reporterId?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  startDate?: Date | undefined;
  dueDate?: Date | undefined;
}

export interface SearchEpicsParams {
  columnId?: string | undefined;
  minStartDate?: Date | undefined;
  maxDueDate?: Date | undefined;
  epicsIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface Dependency {
  id: string;
  blockingEpicId: string;
  blockedEpicId: string;
}

export interface DependencyId {
  dependencyId: string;
}

export interface CreateDependencyRequest {
  blockingEpicId: string;
  blockedEpicId: string;
}

export interface SearchDependenciesParams {
  blockingEpicId?: string | undefined;
  blockedEpicId?: string | undefined;
  dependenciesIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export const ISSUES_PACKAGE_NAME = "issues";

export interface BoardsServiceClient {
  getBoardById(request: BoardId): Observable<Board>;

  getBoardByProjectId(request: ProjectId): Observable<Board>;

  createBoard(request: ProjectId): Observable<Board>;

  deleteBoard(request: BoardId): Observable<Board>;
}

export interface BoardsServiceController {
  getBoardById(request: BoardId): Promise<Board> | Observable<Board> | Board;

  getBoardByProjectId(
    request: ProjectId
  ): Promise<Board> | Observable<Board> | Board;

  createBoard(request: ProjectId): Promise<Board> | Observable<Board> | Board;

  deleteBoard(request: BoardId): Promise<Board> | Observable<Board> | Board;
}

export function BoardsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getBoardById",
      "getBoardByProjectId",
      "createBoard",
      "deleteBoard",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("BoardsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("BoardsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const BOARDS_SERVICE_NAME = "BoardsService";

export interface ColumnsServiceClient {
  getColumnById(request: ColumnId): Observable<Column>;

  searchColumns(request: SearchColumnsParams): Observable<Column>;

  createColumn(request: BoardIdAndColumnName): Observable<Column>;

  updateColumn(request: ColumnIdAndName): Observable<Column>;

  deleteColumn(request: ColumnId): Observable<Column>;
}

export interface ColumnsServiceController {
  getColumnById(
    request: ColumnId
  ): Promise<Column> | Observable<Column> | Column;

  searchColumns(request: SearchColumnsParams): Observable<Column>;

  createColumn(
    request: BoardIdAndColumnName
  ): Promise<Column> | Observable<Column> | Column;

  updateColumn(
    request: ColumnIdAndName
  ): Promise<Column> | Observable<Column> | Column;

  deleteColumn(
    request: ColumnId
  ): Promise<Column> | Observable<Column> | Column;
}

export function ColumnsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getColumnById",
      "searchColumns",
      "createColumn",
      "updateColumn",
      "deleteColumn",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("ColumnsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("ColumnsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const COLUMNS_SERVICE_NAME = "ColumnsService";

export interface IssuesServiceClient {
  getIssueById(request: IssueId): Observable<Issue>;

  searchIssues(request: SearchIssuesParams): Observable<Issue>;

  createIssue(request: CreateIssueRequest): Observable<Issue>;

  updateIssue(request: UpdateIssueRequest): Observable<Issue>;

  deleteIssue(request: IssueId): Observable<Issue>;
}

export interface IssuesServiceController {
  getIssueById(request: IssueId): Promise<Issue> | Observable<Issue> | Issue;

  searchIssues(request: SearchIssuesParams): Observable<Issue>;

  createIssue(
    request: CreateIssueRequest
  ): Promise<Issue> | Observable<Issue> | Issue;

  updateIssue(
    request: UpdateIssueRequest
  ): Promise<Issue> | Observable<Issue> | Issue;

  deleteIssue(request: IssueId): Promise<Issue> | Observable<Issue> | Issue;
}

export function IssuesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getIssueById",
      "searchIssues",
      "createIssue",
      "updateIssue",
      "deleteIssue",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("IssuesService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("IssuesService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ISSUES_SERVICE_NAME = "IssuesService";

export interface EpicsServiceClient {
  getEpicById(request: EpicId): Observable<Epic>;

  searchEpics(request: SearchEpicsParams): Observable<Epic>;

  createEpic(request: CreateEpicRequest): Observable<Epic>;

  updateEpic(request: UpdateEpicRequest): Observable<Epic>;

  deleteEpic(request: EpicId): Observable<Epic>;
}

export interface EpicsServiceController {
  getEpicById(request: EpicId): Promise<Epic> | Observable<Epic> | Epic;

  searchEpics(request: SearchEpicsParams): Observable<Epic>;

  createEpic(
    request: CreateEpicRequest
  ): Promise<Epic> | Observable<Epic> | Epic;

  updateEpic(
    request: UpdateEpicRequest
  ): Promise<Epic> | Observable<Epic> | Epic;

  deleteEpic(request: EpicId): Promise<Epic> | Observable<Epic> | Epic;
}

export function EpicsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getEpicById",
      "searchEpics",
      "createEpic",
      "updateEpic",
      "deleteEpic",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("EpicsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("EpicsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const EPICS_SERVICE_NAME = "EpicsService";

export interface DependenciesServiceClient {
  getDependencyById(request: DependencyId): Observable<Dependency>;

  searchDependencies(request: SearchDependenciesParams): Observable<Dependency>;

  createDependency(request: CreateDependencyRequest): Observable<Dependency>;

  deleteDependency(request: DependencyId): Observable<Dependency>;
}

export interface DependenciesServiceController {
  getDependencyById(
    request: DependencyId
  ): Promise<Dependency> | Observable<Dependency> | Dependency;

  searchDependencies(request: SearchDependenciesParams): Observable<Dependency>;

  createDependency(
    request: CreateDependencyRequest
  ): Promise<Dependency> | Observable<Dependency> | Dependency;

  deleteDependency(
    request: DependencyId
  ): Promise<Dependency> | Observable<Dependency> | Dependency;
}

export function DependenciesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getDependencyById",
      "searchDependencies",
      "createDependency",
      "deleteDependency",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("DependenciesService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("DependenciesService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const DEPENDENCIES_SERVICE_NAME = "DependenciesService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
