import { Neo4jd3 } from 'neo4jd3';

declare global {
  interface Window {
    Neo4jd3: typeof Neo4jd3;
    d3: any;
  }
}