-- 创建触发器 每当App1 App2 App3有create的时候 count+1
-- 每天零点 count复原成0
-- count 存储
-- 但是count变量无法存成系统变量
-- 持久化只能新建一个表来存储
-- 虽然我知道这样处理很糟糕 但是目前没有想到好的解决办法

drop table if exists conf;
create table conf (id int primary key, applycount int, approvecount int);
insert into conf (id, applycount, approvecount) values (0, 0, 0);

set time_zone = '+8:00';
set global event_scheduler = on;

delimiter $$
drop event if exists event_clear_app_count;
create event if not exists event_clear_app_count
	on schedule 
	every 10 minute
	starts '2017-04-20 01:00:00'
	on completion preserve enable
	do 
	begin
    update conf set applycount = 0 where id = 0;
    update conf set approvecount = 0 where id = 0;
	end $$
delimiter ;

delimiter $$
drop trigger if exists trigger_add_apply_count_when_app1;
create trigger trigger_add_apply_count_when_app1
	after insert on application1
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end $$
delimiter ;

delimiter $$
drop trigger if exists trigger_add_apply_count_when_app2;
create trigger trigger_add_apply_count_when_app2
	after insert on application2
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end $$
delimiter ;

delimiter $$
drop trigger if exists trigger_add_apply_count_when_app3;
create trigger trigger_add_apply_count_when_app3
	after insert on application3
	for each row
	begin 
	update conf set applycount = applycount + 1 where id = 0;
	end $$
delimiter ;

delimiter $$
drop trigger if exists trigger_add_approve_count_when_app1;
create trigger trigger_add_approve_count_when_app1
	after update on application1
	for each row
	begin
	if old.approveid  IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
	end $$
delimiter ; 

delimiter $$
drop trigger if exists trigger_add_approve_count_when_app2;
create trigger trigger_add_approve_count_when_app2
	after update on application2
	for each row
	begin
	if old.approveid IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
	end $$
delimiter ; 

delimiter $$
drop trigger if exists trigger_add_approve_count_when_app3;
create trigger trigger_add_approve_count_when_app3
	after update on application3
	for each row
	begin
	if old.approveid IS NULL then
	update conf set approvecount = approvecount + 1 where id = 0;
	end if;
	end $$
delimiter ; 