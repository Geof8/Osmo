-- Add manual early_adopters_remaining counter to settings
insert into public.settings (key, value)
values ('early_adopters_remaining', '47')
on conflict (key) do nothing;

-- Enable realtime on settings table so homepage updates instantly
alter publication supabase_realtime add table public.settings;
