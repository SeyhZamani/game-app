CREATE TABLE public.event_store (
  aggregate_uuid uuid NOT NULL,
  aggregate_type_id integer NOT NULL,
  event_type_id integer NOT NULL,
  metadata json NOT NULL,
  create_time timestamp without time zone NOT NULL,
  CONSTRAINT fk_event_store_event_type FOREIGN KEY (event_type_id) REFERENCES public.event_type (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_event_store_aggregate_type FOREIGN KEY (aggregate_type_id) REFERENCES public.aggregate_type (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);

